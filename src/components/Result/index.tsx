import S from './styles.module.scss'

interface ResultProps {
  correctAnswersCount: number
  quizSize: number
  handleTryAgain: () => void
}

export function Result ({ correctAnswersCount, quizSize, handleTryAgain }: ResultProps) {
  return (
    <div className={S.container}>
      <h1>Resultado</h1>
      
      <p>Você acertou {correctAnswersCount} de {quizSize} perguntas!</p>

      <button onClick={handleTryAgain}>
        Tente Novamente
      </button>
    </div>
  )
}