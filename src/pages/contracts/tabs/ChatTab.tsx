export default function ChatTab() {
  const messages = [
    { id: 1, sender: "Sarah Chen", text: "Hi! Can we discuss the project timeline?", time: "10:30 AM", isMe: false },
    { id: 2, sender: "You", text: "Sure! I can deliver the first milestone by next week.", time: "10:32 AM", isMe: true },
    { id: 3, sender: "Sarah Chen", text: "Perfect! That works for me.", time: "10:35 AM", isMe: false },
  ]

  return (
    <div className="bg-base-surface rounded-md p-xl shadow-sm">
      <h3 className="text-h2 font-semibold mb-lg mt-0 text-text-primary flex items-center gap-sm">
        <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
          <path d="M23 17a2 2 0 0 1-2 2H9l-4 4V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="#E9E7FF" />
          <path d="M23 17a2 2 0 0 1-2 2H9l-4 4V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Messages
      </h3>

      <div className="flex flex-col gap-md mb-lg">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-lg rounded-md max-w-[75%] ${
              msg.isMe 
                ? 'bg-primary-main self-end border-none' 
                : 'bg-base-background self-start border border-base-border'
            }`}
          >
            <div className={`text-caption font-semibold mb-xs ${msg.isMe ? 'text-text-inverse' : 'text-text-secondary'}`}>
              {msg.sender}
            </div>
            <div className={`text-body leading-normal mb-xs ${msg.isMe ? 'text-text-inverse' : 'text-text-primary'}`}>
              {msg.text}
            </div>
            <div className={`text-caption opacity-70 ${msg.isMe ? 'text-text-inverse' : 'text-text-secondary'}`}>
              {msg.time}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-sm">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-lg py-md text-body border border-base-border rounded-sm bg-base-background text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary-main"
        />
        <button className="px-xl py-md text-body cursor-pointer bg-primary-main text-text-inverse border-none rounded-sm font-semibold hover:bg-primary-hover transition-colors">
          Send
        </button>
      </div>
    </div>
  )
}
