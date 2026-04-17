import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Icon from "@/components/ui/icon"

export default function LaunchPadPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [referralLink, setReferralLink] = useState("")
  const [copied, setCopied] = useState(false)

  const generateReferralLink = (userEmail: string) => {
    const code = btoa(userEmail).slice(0, 8).toUpperCase()
    return `https://style-drop.ru/ref/${code}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setReferralLink(generateReferralLink(email))
    setIsSubmitted(true)
    setIsLoading(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Icon name="CheckCircle" className="h-16 w-16 text-primary mx-auto" />
              <h2 className="text-2xl font-bold text-foreground">Вы в списке!</h2>
              <p className="text-muted-foreground">
                {name}, вы среди первых! Пришлём письмо на {email}, когда откроем магазин.
              </p>

              <div className="bg-muted rounded-lg p-4 space-y-3 text-left">
                <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Icon name="Gift" size={16} className="text-primary" />
                  Пригласи друзей — получи скидку 15%
                </p>
                <p className="text-xs text-muted-foreground">
                  За каждого приглашённого друга вы оба получите скидку на первый заказ
                </p>
                <div className="flex gap-2">
                  <Input
                    readOnly
                    value={referralLink}
                    className="text-xs bg-background"
                  />
                  <Button size="sm" onClick={handleCopy} className="shrink-0">
                    {copied ? <Icon name="Check" size={16} /> : <Icon name="Copy" size={16} />}
                  </Button>
                </div>
              </div>

              <Button onClick={() => setIsSubmitted(false)} variant="outline" className="mt-2 w-full">
                Зарегистрировать другой email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-widest uppercase">StyleDrop</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:opacity-80 transition-opacity">
              О нас
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              Коллекции
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              Контакты
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full">
              <Icon name="Sparkles" size={14} />
              Скоро открытие
            </div>
            <h2 className="text-4xl font-bold text-foreground leading-tight">
              Одежда, которая <span className="text-primary">говорит</span> за вас
            </h2>
            <p className="text-lg text-muted-foreground">
              Запишитесь в лист ожидания и получите эксклюзивный доступ к первой коллекции + скидку за приглашение друзей.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-foreground">Войти в список первых</CardTitle>
              <CardDescription className="text-center">
                Бесплатно. Без спама. Только лучшие новинки.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Icon name="User" className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <div className="relative">
                  <Icon name="Mail" className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="ваш@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full font-semibold text-base"
                  disabled={isLoading}
                >
                  {isLoading ? "Отправка..." : "Получить ранний доступ →"}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  После регистрации вы получите реферальную ссылку для приглашения друзей
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="space-y-1">
              <Icon name="Tag" size={20} className="text-primary mx-auto" />
              <p className="text-xs text-muted-foreground">Скидка за приглашение</p>
            </div>
            <div className="space-y-1">
              <Icon name="Bell" size={20} className="text-primary mx-auto" />
              <p className="text-xs text-muted-foreground">Первый доступ к новинкам</p>
            </div>
            <div className="space-y-1">
              <Icon name="Star" size={20} className="text-primary mx-auto" />
              <p className="text-xs text-muted-foreground">VIP-статус при открытии</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Уже <span className="font-semibold text-primary">2 384</span> человека ждут открытия
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card py-8 px-6 mt-16">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <p className="text-muted-foreground">© 2025 StyleDrop. Все права защищены.</p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Условия использования
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
