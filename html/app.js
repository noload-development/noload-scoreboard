const Scoreboard = () => {
  const [playerCount, setPlayerCount] = React.useState(0)
  const [maxPlayers, setMaxPlayers] = React.useState(32)
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    window.addEventListener('message', (event) => {
      const data = event.data
      if (data.action === 'openScoreboard') {
        setIsVisible(true)
      } else if (data.action === 'closeScoreboard') {
        setIsVisible(false)
      } else if (data.action === 'updatePlayerCount') {
        setPlayerCount(data.playerCount)
        setMaxPlayers(data.maxPlayers)
      }
    })
  }, [])

  const progressPercentage = (playerCount / maxPlayers) * 100

  return (
    <div 
      className={`
        fixed top-4 left-1/2 transform -translate-x-1/2 
        bg-gradient-to-r from-gray-900 to-gray-800 text-white 
        p-6 rounded-2xl shadow-lg 
        transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}
        max-w-sm w-full
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-bold">NoLoad Server Status</div>
        <div className="bg-white text-blue-600 rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
      </div>
      <div className="bg-white bg-opacity-20 rounded-xl p-4 mb-4">
        <div className="text-sm font-semibold mb-2">Players Online</div>
        <div className="flex items-end justify-between">
          <div className="text-4xl font-bold">{playerCount}</div>
          <div className="text-xl font-semibold">/ {maxPlayers}</div>
        </div>
        <div className="mt-2 h-2 bg-white bg-opacity-30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-300 ease-in-out" 
            style={{width: `${progressPercentage}%`}}
          ></div>
        </div>
      </div>
      <div className="text-center text-sm font-medium">
        Hold HOME to show/hide scoreboard
      </div>
    </div>
  )
}

ReactDOM.render(<Scoreboard />, document.getElementById('root'))

