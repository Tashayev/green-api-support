import { MessageSquare, Send } from "lucide-react"
import { ActionButton, Field } from "../ui"

export function MessageCard({
  chatId,
  message,
  onChangeChatId,
  onChangeMessage,
  loading,
  onSubmit,
}) {
  return (
    <section className="card">
      <div className="card-heading">
        <div className="icon-box">
          <MessageSquare size={18} />
        </div>
        <div>
          <h2>Сообщение</h2>
          <span>SendMessage</span>
        </div>
      </div>

      <Field
        label="Chat ID"
        value={chatId}
        onChange={onChangeChatId}
        placeholder="77771234567@c.us"
      />

      <label className="field-label">Message</label>
      <textarea
        className="input textarea-small"
        value={message}
        onChange={(e) => onChangeMessage(e.target.value)}
        placeholder="Текст сообщения"
      />

      <ActionButton
        icon={<Send size={16} />}
        loading={loading}
        onClick={onSubmit}
      >
        sendMessage
      </ActionButton>
    </section>
  )
}