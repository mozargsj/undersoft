'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

const DEFAULT_FROM = { opacity: 0, y: 40 };
const DEFAULT_TO = { opacity: 1, y: 0 };
const STIFFNESS = 180;
const DAMPING = 19;
const KICK = 0.024;

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const fontsAreLoaded = () => typeof document !== 'undefined' && (!document.fonts || document.fonts.status === 'loaded');

const waveEase = t => 1 - Math.cos(t * Math.PI * 1.5) * Math.pow(1 - t, 1.2);

const getEffect = (effect, em) => {
  switch (effect) {
    case 'fade':
      return { from: { opacity: 0 }, to: { opacity: 1 }, ease: 'power2.inOut' };
    case 'blur':
      return {
        from: { opacity: 0, filter: `blur(${Math.round(em * 1.4) / 10}px)` },
        to: { opacity: 1, filter: 'blur(0px)' },
        ease: 'power2.out'
      };
    case 'flip': {
      const setup = { transformPerspective: em * 6, transformOrigin: '50% 100%' };
      return {
        from: { ...setup, opacity: 0, rotationX: -90 },
        to: { ...setup, opacity: 1, rotationX: 0 },
        ease: 'power3.out'
      };
    }
    case 'pop':
      return { from: { opacity: 0, scale: 0 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(1.6)' };
    case 'skew':
      return {
        from: { transformOrigin: '50% 100%', opacity: 0, x: -em * 0.4, skewX: -24 },
        to: { transformOrigin: '50% 100%', opacity: 1, x: 0, skewX: 0 },
        ease: 'expo.out'
      };
    case 'wave':
      return { from: { opacity: 0, y: em * 0.45 }, to: { opacity: 1, y: 0 }, ease: waveEase };
    default:
      return { from: { ...DEFAULT_FROM }, to: { ...DEFAULT_TO }, ease: 'power3.out' };
  }
};

// varios textos criam ScrollTriggers quase juntos: um unico refresh (debounced) acerta as posicoes
let refreshTimer = null;
const scheduleRefresh = () => {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
};

const SplitText = ({
  text: textProp,
  children,
  className = '',
  delay = 25,
  startDelay = 0, // s: espera antes da 1a revelacao (so na entrada, nao nos replays)
  maxStagger = 0.8, // s: a cascata inteira nunca passa disso (textos longos)
  ignore = '.rotator', // elementos controlados pelo React: nao sao divididos, entram como bloco
  duration = 0.7,
  // scrub: a animacao acompanha a rolagem (rolou para baixo = texto aparece, voltou = some).
  // scrub={false} = anima uma vez, no tempo, ao entrar na tela (usado na hero).
  scrub = true,
  scrubStart = 'clamp(top 92%)', // comeca a aparecer quando o topo do texto chega a 92% da tela
  scrubEnd = 'clamp(top 62%)', // totalmente visivel quando o topo chega a 62%
  ease,
  splitType = 'chars',
  from,
  to,
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign,
  tag = 'p',
  staggerFrom = 'start',
  mask = false,
  effect = 'fade',
  trigger = 'view',
  loop = false,
  loopDelay = 1.5,
  hoverEffect = 'none',
  color,
  accentColor = '#ff5220',
  onLetterAnimationComplete
}) => {
  // titulos com JSX (spans, <br/>) chegam como children; text vira so uma chave estavel
  const content = children ?? textProp;
  const text = typeof content === 'string' ? content : content ? 'node' : '';
  const ref = useRef(null);
  const completedTextRef = useRef(null);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const liveRef = useRef({ trigger, hoverEffect, accentColor });
  const [fontsLoaded, setFontsLoaded] = useState(fontsAreLoaded);
  const [ready, setReady] = useState(false);
  const [pageReady, setPageReady] = useState(false);

  // espera o loader da pagina (html.is-loading). setTimeout 0: o App adiciona a classe num effect
  // que roda depois dos filhos.
  useEffect(() => {
    const root = document.documentElement;
    let observer = null;
    const timer = setTimeout(() => {
      if (!root.classList.contains('is-loading')) {
        setPageReady(true);
        return;
      }
      observer = new MutationObserver(() => {
        if (!root.classList.contains('is-loading')) {
          observer.disconnect();
          setPageReady(true);
        }
      });
      observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    }, 0);
    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, []);

  useIsoLayoutEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
    liveRef.current = { trigger, hoverEffect, accentColor };
  });

  useEffect(() => {
    if (fontsLoaded) return undefined;
    let active = true;
    document.fonts.ready.then(() => {
      if (active) setFontsLoaded(true);
    });
    return () => {
      active = false;
    };
  }, [fontsLoaded]);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !text || !fontsLoaded || !pageReady) return;
      el.getBoundingClientRect();
      if (!fontsAreLoaded()) {
        setFontsLoaded(false);
        return;
      }

      const finish = () => {
        if (completedTextRef.current === text) return;
        completedTextRef.current = text;
        onCompleteRef.current?.();
      };

      if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        setReady(true);
        finish();
        return;
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;
      const unit = splitType.includes('chars') ? 'chars' : splitType.includes('words') ? 'words' : 'lines';

      const em = parseFloat(getComputedStyle(el).fontSize) || 16;
      const custom = from !== undefined || to !== undefined;
      const look = getEffect(effect, em);
      const fromVars = custom ? { ...(from || DEFAULT_FROM) } : look.from;
      const toVars = custom ? { ...(to || DEFAULT_TO) } : look.to;
      const easing = ease || (custom ? 'power3.out' : look.ease);
      const settle = custom ? 'willChange' : 'transform,filter,willChange';
      const exit = Math.max(0.35, duration * 0.55);

      let pieces = [];
      let movers = [];
      let order = gsap.utils.distribute({ each: delay / 1000, from: staggerFrom });
      let revealed = completedTextRef.current === text;
      let intro = null;
      let busy = null;
      let queued = null;
      let raf = 0;
      let last = 0;
      let centers = null;
      const lift = em * 0.2;
      const springs = [];
      const kicks = [];
      const pointer = { x: 0, y: 0, inside: false };

      const reveal = (initial, vars) => {
        const accent = liveRef.current.accentColor;
        const tl = gsap.timeline(vars);
        // com stagger, o immediateRender so pega a 1a letra: esconde todas ja no estado inicial
        if (initial) gsap.set(pieces, { ...fromVars });
        tl.fromTo(
          pieces,
          { ...fromVars, willChange: 'transform, opacity' },
          { ...toVars, duration, ease: easing, stagger: order, immediateRender: initial },
          0
        );
        if (accent) {
          tl.fromTo(
            pieces,
            { color: accent },
            {
              color: getComputedStyle(el).color,
              duration: duration * 0.7,
              ease: 'power1.inOut',
              stagger: order,
              immediateRender: initial
            },
            duration * 0.3
          );
        }
        if (!scrub) tl.set(pieces, { clearProps: accent ? `${settle},color` : settle });
        return tl;
      };

      const conceal = () => {
        const accent = liveRef.current.accentColor;
        const tl = gsap.timeline();
        tl.fromTo(
          pieces,
          { ...toVars, willChange: 'transform, opacity' },
          { ...fromVars, duration: exit, ease: 'power2.in', stagger: order, immediateRender: false },
          0
        );
        if (accent) tl.to(pieces, { color: accent, duration: exit, ease: 'power1.in', stagger: order }, 0);
        return tl;
      };

      const cycle = () => {
        if (busy || !revealed || !pieces.length) return;
        queued?.kill();
        queued = null;
        busy = gsap
          .timeline({
            onComplete: () => {
              busy = null;
              queue();
            }
          })
          .add(conceal(), 0)
          .add(reveal(false), exit);
      };

      const queue = () => {
        queued?.kill();
        queued = loop ? gsap.delayedCall(loopDelay, cycle) : null;
      };

      const measure = () => {
        const box = el.getBoundingClientRect();
        centers = movers.map((node, i) => {
          const rect = node.getBoundingClientRect();
          return {
            x: rect.left + rect.width / 2 - box.left,
            y: rect.top + rect.height / 2 - box.top - (springs[i]?.y || 0)
          };
        });
      };

      const tick = now => {
        raf = 0;
        const dt = Math.min(0.032, Math.max(0.001, (now - last) / 1000));
        last = now;
        const spots = liveRef.current.hoverEffect === 'lift' && pointer.inside && revealed ? centers : null;
        const radius = em * 1.15;
        let moving = false;
        for (let k = kicks.length - 1; k >= 0; k--) {
          if (now < kicks[k].at) continue;
          const spring = springs[kicks[k].index];
          if (spring) spring.v -= kicks[k].velocity;
          kicks.splice(k, 1);
        }
        movers.forEach((node, i) => {
          const spring = springs[i] || (springs[i] = { y: 0, v: 0 });
          const spot = spots?.[i];
          let target = 0;
          if (spot) {
            const dx = (spot.x - pointer.x) / radius;
            const dy = (spot.y - pointer.y) / (radius * 1.4);
            target = -lift * Math.exp(-(dx * dx + dy * dy) * 0.5);
          }
          spring.v += (STIFFNESS * (target - spring.y) - DAMPING * spring.v) * dt;
          spring.y += spring.v * dt;
          if (Math.abs(target - spring.y) < 0.02 && Math.abs(spring.v) < 0.05) {
            spring.y = target;
            spring.v = 0;
          } else {
            moving = true;
          }
          node.style.translate = Math.abs(spring.y) > 0.01 ? `0 ${spring.y.toFixed(2)}px` : '';
        });
        if (moving || kicks.length) raf = requestAnimationFrame(tick);
      };

      const wake = () => {
        if (raf) return;
        last = performance.now();
        raf = requestAnimationFrame(tick);
      };

      const locate = e => {
        const box = el.getBoundingClientRect();
        pointer.x = e.clientX - box.left;
        pointer.y = e.clientY - box.top;
      };

      const onEnter = e => {
        locate(e);
        pointer.inside = true;
        if (!revealed) return;
        const live = liveRef.current;
        if (live.trigger === 'hover') cycle();
        if (live.hoverEffect === 'none') return;
        measure();
        if (live.hoverEffect === 'wave') {
          const now = performance.now();
          const speed = em * 9;
          const velocity = (em * 0.16) / KICK;
          centers.forEach((center, index) => {
            kicks.push({ index, velocity, at: now + (Math.abs(center.x - pointer.x) / speed) * 1000 });
          });
        }
        wake();
      };

      const onMove = e => {
        locate(e);
        pointer.inside = true;
        if (!revealed || liveRef.current.hoverEffect !== 'lift') return;
        if (!centers) measure();
        wake();
      };

      const onLeave = () => {
        pointer.inside = false;
        wake();
      };

      const onClick = () => {
        if (liveRef.current.trigger === 'click') cycle();
      };

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        tag: 'span',
        ignore,
        smartWrap: true,
        autoSplit: splitType === 'lines',
        mask: mask ? unit : undefined,
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        onSplit: self => {
          const base = [self[unit], self.chars, self.words, self.lines].find(list => list.length) || [];
          const extras = ignore ? Array.from(el.querySelectorAll(ignore)) : [];
          pieces = [...extras, ...base];
          movers = mask && self.masks?.length === pieces.length ? self.masks : pieces;
          order = gsap.utils.distribute({
            each: Math.min(delay / 1000, maxStagger / Math.max(pieces.length, 1)),
            from: staggerFrom
          });
          centers = null;
          springs.length = 0;
          kicks.length = 0;
          if (busy && busy !== intro) {
            busy.kill();
            busy = null;
          }
          if (revealed) return undefined;
          intro = reveal(
            true,
            scrub
              ? {
                  // progresso preso a rolagem, nos dois sentidos (sem "revealed": nunca replica)
                  scrollTrigger: { trigger: el, start: scrubStart, end: scrubEnd, scrub: true, invalidateOnRefresh: true }
                }
              : {
                  delay: startDelay,
                  scrollTrigger:
                    trigger === 'load'
                      ? undefined
                      : { trigger: el, start, once: true, fastScrollEnd: true, anticipatePin: 0.4 },
                  onComplete: () => {
                    revealed = true;
                    intro = null;
                    busy = null;
                    finish();
                    queue();
                  }
                }
          );
          if (scrub) scheduleRefresh();
          busy = intro;
          return intro;
        }
      });
      setReady(true);
      if (revealed) queue();

      el.addEventListener('pointerenter', onEnter);
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
      el.addEventListener('click', onClick);

      return () => {
        cancelAnimationFrame(raf);
        queued?.kill();
        busy?.kill();
        el.removeEventListener('pointerenter', onEnter);
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
        el.removeEventListener('click', onClick);
        movers.forEach(node => {
          node.style.translate = '';
        });
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === el) st.kill();
        });
        splitInstance.revert();
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        staggerFrom,
        mask,
        effect,
        trigger,
        loop,
        loopDelay,
        scrub,
        fontsLoaded,
        pageReady
      ],
      scope: ref,
      revertOnUpdate: true
    }
  );

  const Tag = tag || 'p';
  const clip =
    hoverEffect === 'none' && (from !== undefined || to !== undefined || effect === 'rise' || effect === 'fade');

  return (
    <Tag
      key={text}
      ref={ref}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        overflow: clip ? 'hidden' : 'visible',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        color,
        cursor: trigger === 'click' ? 'pointer' : undefined,
        visibility: ready ? undefined : 'hidden'
      }}
    >
      {content}
    </Tag>
  );
};

export default SplitText;