import { FileUp } from "lucide-react"
import { ActionButton, Field } from "./ui"

export function FileCard({
  chatId,
  fileUrl,
  fileName,
  caption,
  onChangeChatId,
  onChangeFileUrl,
  onChangeFileName,
  onChangeCaption,
  loading,
  onSubmit,
}) {
  return (
    <section className="card">
      <div className="card-heading">
        <div className="icon-box">
          <FileUp size={18} />
        </div>
        <div>
          <h2>Файл</h2>
          <span>SendFileByUrl</span>
        </div>
      </div>

      <Field
        label="Chat ID"
        value={chatId}
        onChange={onChangeChatId}
        placeholder="77771234567@c.us"
      />

      <Field
        label="File URL"
        value={fileUrl}
        onChange={onChangeFileUrl}
        placeholder="https://example.com/file.png"
      />

      <Field
        label="File name"
        value={fileName}
        onChange={onChangeFileName}
        placeholder="file.png (опционально)"
      />

      <Field
        label="Caption"
        value={caption}
        onChange={onChangeCaption}
        placeholder="Подпись к файлу (опционально)"
      />

      <ActionButton
        icon={<FileUp size={16} />}
        loading={loading}
        onClick={onSubmit}
      >
        sendFileByUrl
      </ActionButton>
    </section>
  )
}