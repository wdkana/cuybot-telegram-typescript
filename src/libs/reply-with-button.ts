type ReplyWithButton = {
    text: string,
    callback_data: string
}

const replyWithButton = ({ text, callback_data }: ReplyWithButton) => {
    return {
        reply_markup: {
            inline_keyboard: [
                [
                    { text, callback_data }
                ]
            ]
        }
    }
}

export default replyWithButton