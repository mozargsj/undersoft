import { Children, Fragment, isValidElement } from 'react';
import './ScrollStack.css';

// Pilha de cards 100% CSS: nenhum listener de scroll, nenhum rAF, nenhum JS por frame.
//  - cada card e `position: sticky` com `top` escalonado (um fica "preso" sobre o outro);
//  - o card de tras diminui (scale) conforme o da frente o cobre, via animacao ligada ao
//    scroll (animation-timeline). Sem suporte no navegador, a pilha funciona igual, so sem
//    esse encolhimento.
// A pilha da vez do card i e guiada por um marcador de altura zero colocado no ponto onde o
// card i + 1 entra no fluxo (marcador nao e sticky, entao a linha do tempo nao "congela").

const toLength = value => (typeof value === 'number' ? `${value}px` : value);

export const ScrollStackItem = ({ children, itemClassName = '', style }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()} style={style}>
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemStackDistance = 24,
  stackPosition = '15%',
  itemScale = 0.05,
  holdDistance = 200
}) => {
  const items = Children.toArray(children);
  const last = items.length - 1;
  const scopes = items
    .slice(1)
    .map((_, i) => `--stack-c${i + 1}`)
    .join(', ');

  return (
    <div
      className={`scroll-stack ${className}`.trim()}
      style={{
        '--stack-top': toLength(stackPosition),
        '--stack-offset': `${itemStackDistance}px`,
        '--stack-bury': 1 - itemScale
      }}
    >
      <div className="scroll-stack__inner" style={scopes ? { timelineScope: scopes } : undefined}>
        {items.map((child, index) => {
          const gap = itemDistance - (items.length - index) * itemStackDistance;
          return (
            <Fragment key={isValidElement(child) ? (child.key ?? index) : index}>
              {index > 0 && (
                <div aria-hidden="true" style={{ height: Math.max(0, gap), marginTop: Math.min(0, gap) }} />
              )}
              {/* marcador de altura zero no ponto onde este card entra no fluxo (nao e sticky) */}
              <div
                aria-hidden="true"
                className="scroll-stack__mark"
                style={index > 0 ? { viewTimeline: `--stack-c${index} block` } : undefined}
              />
              <div
                className={`scroll-stack__slot${index < last ? ' scroll-stack__slot--buries' : ''}`}
                style={{
                  '--i': index,
                  top: `calc(var(--stack-top) + ${index} * var(--stack-offset))`,
                  marginBottom: (last - index) * itemStackDistance,
                  zIndex: index + 1,
                  // linha do tempo do card seguinte (o que cobre este)
                  ...(index < last ? { '--stack-timeline': `--stack-c${index + 1}` } : null)
                }}
              >
                {child}
              </div>
            </Fragment>
          );
        })}
        <div className="scroll-stack__end" aria-hidden="true" style={{ height: holdDistance }} />
      </div>
    </div>
  );
};

export default ScrollStack;