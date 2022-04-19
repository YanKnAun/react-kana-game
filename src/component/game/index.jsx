import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { hiraganaList, katakanaList } from './kanaList'

export default function Game() {
  const answerRef = useRef(null)

  const navigate = useNavigate()

  const [game, updateGame] = useState({
    gameType: "ひらがな",
    score: 0,
    highScore: 0,
    wrong: 0,
    chancesLeft: 0,
  })

  const [kanaList, updateKanaList] = useState([])

  const [question, updateQuestion] = useState({
    label: "?",
    id: ""
  })

  const [choice, setChoice] = useState([
    {
      label: 'a',
      error: false
    },
    {
      label: 'i',
      error: false
    },
    {
      label: 'u',
      error: false
    },
    {
      label: 'e',
      error: false
    }
  ])

  const [query] = useSearchParams()

  useEffect(() => {
    console.log("game--useEffect")

    initGame()
  }, [])

  function initGame() {
    console.log("initGame-fn")
    const gameType = query.get("type")

    let list = []

    updateScore({
      gameType,
      score: 0,
      wrong: 0,
      chancesLeft: 10
    })

    if (gameType === "ひらがな") {
      list = Object.values(hiraganaList)
    } else if (gameType === "カタカナ") {
      list = Object.values(katakanaList)
    } else if (gameType === "all") {
      list = Object.values(hiraganaList).concat(Object.values(katakanaList))
    } else {
      console.log(`エラー`);
    }

    updateKanaList(list)

    getQuestion(list)
  }

  // 生成一个题目
  function getQuestion(kanaList) {
    const picker = Math.floor(Math.random() * kanaList.length); // Generate a random number that is max or below the kanaList.
    updateQuestion({
      label: kanaList[picker][0],
      id: kanaList[picker][1]
    });

    let answerPadItem = new Array(4).fill("").map(item => ({
      label: "",
      error: false
    }))

    const rightAnswer = Math.floor(Math.random() * answerPadItem.length); // Generate a random number that is max or below the answerPad buttons.
    answerPadItem[rightAnswer]["label"] = kanaList[picker][1]; // Put the right answer in one of the answepad buttons.
    // console.log(`The right answer "${kanaList[picker][1]}" is set at spot ${rightAnswer + 1}.`);

    // Loop over each answerPad.
    answerPadItem.forEach((item, index) => {
      if (item.label === "") { // Check to see if the item is blank. If it isn't, it should be the right answer and skipped.
        let answerChoicePicker = Math.floor(Math.random() * kanaList.length); // Generate a random number that is max or below the kanaList.
        let answerChoice = kanaList[answerChoicePicker][1]; // This is to get an answer choice.

        let step = 1; // This is being used in a while loop.

        while (step === 1) {
          if (answerPadItem.some(item => item.label === answerChoice)) {
            answerChoicePicker = Math.floor(Math.random() * kanaList.length); // Generate a random number that is max or below the kanaList.
            answerChoice = kanaList[answerChoicePicker][1]; // This is to get an answer choice.
          } else {
            answerPadItem[index]["label"] = answerChoice; // Add the answer choice to the current item.
            step++; // Use this to end the for loop.
          }
        }
      }
    })
    // console.log(
    //   Date(),
    //   `Answer Choice 1: "${answerPadItem[0]["label"]}"`,
    //   `Answer Choice 2: "${answerPadItem[1]["label"]}"`,
    //   `Answer Choice 3: "${answerPadItem[2]["label"]}"`,
    //   `Answer Choice 4: "${answerPadItem[3]["label"]}"`
    // );

    setChoice(answerPadItem)
  }

  function checkAnswer(guess) {
    if (guess === question.id) {
      addScore()
      getQuestion(kanaList)
    } else {
      let { chancesLeft, wrong } = game

      let newChoice = choice.map(item => {
        if (item.label === guess) {
          item.error = true
        }

        return item
      })

      setChoice(newChoice)

      wrong ++
      chancesLeft --

      if (chancesLeft === 0) gameOver()

      updateScore({
        wrong,
        chancesLeft
      })
    }
  }

  function addScore() {
    let { score, highScore, wrong } = game

    if (wrong >= 3) {
      score += 0;
    } else if (wrong === 2) {
      score += 25;
    } else if (wrong === 1) {
      score += 50;
    } else {
      score += 100;
    }
    if (score > highScore) highScore = score;
    wrong = 0;

    updateScore({
      wrong,
      score,
      highScore
    })
  }

  function updateScore(game) {
    updateGame((prevState) => {
      return {
        ...prevState,
        ...game
      }
    })
  }

  function gameOver() {
    navigate(`/game/over?score=${game.score}`, { replace: true })
  }

  return (
    <>
      {/* <!-- Game Page --> */}
      <div className="page">
        <div className="count_box">
          <div className="score_cont">
            <h3>機会<br /><span className="chances_left">{game.chancesLeft}</span></h3>
            <h3 className="score_item">スコア<br /><span className="score_label">{game.score}</span></h3>
            <h3 className="score_item">最高のスコア<br /><span className="high_score_label">{game.highScore}</span></h3>
          </div>
        </div>
        {/* <!-- Question Box --> */}
        <div className="question_box">
          <h1 className="question_box_letter" data-answer-id={question.id}>{question.label}</h1>
        </div>
        {/* <!-- Answer Pad --> */}
        <div className="answer_pad_cont" ref={answerRef}>
          {
            choice.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`answer_pad_item ${item.error ? "wrong": ""}`}
                  onClick={() => checkAnswer(item.label)}
                >
                  { item.label }
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}
