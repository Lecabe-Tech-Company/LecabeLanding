/**
 * Single source for the WhatsApp number the whole site links to.
 * Every CTA on the landing opens a conversation with the message already
 * written, so the visitor never has to retype what they were reading about.
 */
export const WHATSAPP_NUMBER = '5511994132821'

export const useWhatsapp = () => {
  const whatsappLink = (message: string): string =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  return { whatsappLink, whatsappNumber: WHATSAPP_NUMBER }
}
