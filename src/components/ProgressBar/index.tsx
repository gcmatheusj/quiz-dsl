import classNames from 'classnames' // ES Modules

import S from './styles.module.scss'

interface ProgressBarProps {
  size: number
  currentStep: number
}

export function ProgressBar({ size, currentStep }: ProgressBarProps) {
  return (
    <div className={S.container}>
      <div className={S.steps} style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
        {Array.from({ length: size }, (_, index) => index + 1).map(step => (
          <div
            key={step}
            className={classNames(S.step, currentStep >= step ? S.active : '')} 
          />
        ))}
      </div>
    </div>
  )
}
