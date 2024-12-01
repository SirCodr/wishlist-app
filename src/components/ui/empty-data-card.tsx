import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Inbox, RefreshCw } from 'lucide-react'

type Props = {
  title?: string
  description?: string
  chidlren?: JSX.Element | JSX.Element[]
}

export default function EmptyDataCard({ title, description, chidlren }: Props) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="flex flex-col items-center justify-center space-y-6 p-8">
        <div className="rounded-full bg-primary/10 p-4">
          <Inbox className="h-12 w-12 text-primary" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-semibold tracking-tight">
            {
              title ?? 'No data available'
            }
          </h3>
          <p className="text-muted-foreground">
            {description ?? 'It seems there is no information to display yet. Try adding some data or refreshing the page.'}
          </p>
        </div>
        {
          chidlren ?? (
            <Button className="mt-4" onClick={() => window.location.reload()}>
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh page
            </Button>
          )
        }
      </CardContent>
    </Card>
  )
}