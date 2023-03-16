import { MouseEvent } from 'react'

import { Question } from '../Quiz'

import S from './styles.module.scss'

interface QuestionAnswerProps {
  question: Question
  answer: string
  handleAnswerQuestion: (
    event: MouseEvent<HTMLButtonElement>,
    question: Question,
    answer: string
  ) => void
}

export function QuestionAnswer ({
  question,
  answer,
  handleAnswerQuestion
}: QuestionAnswerProps) {
  return (
    <button
      className={S.container} 
      onClick={(event) => handleAnswerQuestion(event, question, answer)}
    >
      {answer}
    </button>
  )
}