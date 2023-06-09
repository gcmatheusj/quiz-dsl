import React, { MouseEvent, useState } from 'react'

import { QuestionAnswer } from '../QuestionAnswer'
import { Result } from '../Result'
import { ProgressBar } from '../ProgressBar'

import S from './styles.module.scss'

export interface Question {
  id: number,
  question: string,
  answers: Array<string>,
  correctAnswer: string
}

const QUESTIONS: Array<Question> = [
  {
    id: 1,
    question: 'Qual é o meu nome?',
    answers: ['Miguel', 'Luis', 'Matheus', 'Ana'],
    correctAnswer: 'Matheus',
  },
  {
    id: 2,
    question: 'Qual é a minha idade?',
    answers: ['12', '2', '26', '32'],
    correctAnswer: '26'
  },
  {
    id: 3,
    question: 'O que eu sou?',
    answers: ['Desenvolvedor', 'Médico', 'Eletricista', 'Jogador de Futebol'],
    correctAnswer: 'Desenvolvedor'
  },
  {
    id: 4,
    question: 'Quem é Daniel?',
    answers: ['Homem de ferro', 'Super man', 'Homem aranha', 'Homem formiga'],
    correctAnswer: 'Homem formiga'
  },
]

/**
 * Utilizando TS + React:
 * 1 - Precisamos tipar as nossas props.
 * 2 - Precisamos tipar as funções (parametros e tipo retorno).
 * 3 - Precisamos tipar os estados dos nossos componentes.
 * */
export function Quiz () {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [isTakingQuiz, setIsTakingQuiz] = useState<boolean>(true)
  const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState<boolean>(false)
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0)

  const handleNextQuestion = (): void => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setIsTakingQuiz(false)
    }

    setIsCurrentQuestionAnswered(false)
  }

  const handleAnswerQuestion = (
    event: MouseEvent<HTMLButtonElement>,
    question: Question,
    userAnswer: string
  ): void => {
    if (isCurrentQuestionAnswered) {
      return
    }

    const isCorrectAnswer = question.correctAnswer === userAnswer

    const resultClassName = isCorrectAnswer ? S.correct : S.incorrect

    event.currentTarget.classList.toggle(resultClassName)

    if (isCorrectAnswer) {
      setCorrectAnswersCount(correctAnswersCount + 1)
    }

    setIsCurrentQuestionAnswered(true)
  }

  const handleTryAgain = (): void => {
    setIsTakingQuiz(true)
    setCurrentQuestionIndex(0)
    setCorrectAnswersCount(0)
  }

  const quizSize = QUESTIONS.length
  const currentQuestion = QUESTIONS[currentQuestionIndex]
  const navigationButtonText = 
    currentQuestionIndex + 1 === quizSize ? 'Ver Resultado' : 'Próxima Pergunta'
  const currentQuestionNumber = currentQuestionIndex + 1;

  return (
    <div className={S.container}>
      <div className={S.card}>
        {isTakingQuiz ? (
          <div className={S.quiz}>
            <ProgressBar 
              size={quizSize}
              currentStep={currentQuestionNumber}
            />

            <header className={S.quizHeader}>
              <span>PERGUNTA {currentQuestionNumber}/{quizSize}</span>
              <p>{currentQuestion.question}</p>
            </header>

            <ul className={S.answers}>
              {currentQuestion.answers.map(answer => (
                <li key={answer}>
                  <QuestionAnswer
                    question={currentQuestion}
                    answer={answer}
                    handleAnswerQuestion={handleAnswerQuestion}
                  />
                </li>
              ))}
            </ul>

            <button className={S.navigationBtn} onClick={handleNextQuestion}>
              {navigationButtonText}
            </button>
          </div>
        ) : (
          <Result
            correctAnswersCount={correctAnswersCount}
            quizSize={quizSize}
            handleTryAgain={handleTryAgain}
          />
        )}
      </div>
    </div>
  )
}