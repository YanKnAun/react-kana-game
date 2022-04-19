import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function GameOver() {
  const [query] = useSearchParams()
  const score = query.get("score")

  const navigate = useNavigate()

  return (
    <>
      {/* <!-- Game Over Page --> */}
      <div className="page" data-page="game_over">
        <i className="game_over_banner"></i>
        <h1 className="game_over_text">すごいね！！<br /><span className="game_over_score">{ score || 0 }</span>分</h1>
        <button onClick={() => navigate("/game/option")}>もう一度</button>
      </div>
    </>
  )
}
