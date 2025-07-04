import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (all === 0) return <p>No feedback given</p>

  const average  = (good - bad) / all
  const positive = (good / all) * 100 + ' %'

  return (
    <table>
      <tbody>
        <StatisticLine text="good"     value={good} />
        <StatisticLine text="neutral"  value={neutral} />
        <StatisticLine text="bad"      value={bad} />
        <StatisticLine text="all"      value={all} />
        <StatisticLine text="average"  value={average} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  )
}


const App = () => {
  const [good,    setGood]    = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad,     setBad]     = useState(0)

  return (
    <div style={{ fontFamily: 'sans-serif', lineHeight: 1.6 }}>
      <h2>give feedback</h2>
      <Button onClick={() => setGood(good + 1)}    text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)}      text="bad" />

      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
