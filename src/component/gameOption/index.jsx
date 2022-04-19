import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  let navigate = useNavigate();

  return (
    <>
      {/* <!-- Options Page --> */}
      <div className="page">
        <div className="option_container">
          <button
            className="option_button animate green"
            onClick={() => navigate("/game/index?type=ひらがな", { replace: true })}
          >ひらがな</button>
          <button
            className="option_button animate green"
            onClick={() => navigate("/game/index?type=カタカナ", { replace: true })}
          >カタカナ</button>
          <button
            className="option_button animate green"
            onClick={() => navigate("/game/index?type=all", { replace: true })}
          >ALL KANA</button>
        </div>
      </div>
    </>
  )
}

