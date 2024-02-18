type UserData = {
    from?: {
        id: number,
        first_name?: string,
        last_name?: string,
        username?: string
    }
    data?: string
    text?: string
}

type BMKGDataPosts = {
  title: string, 
  image: string, 
  headline: string
}

type BMKGData = {
  posts: BMKGDataPosts
}

type QuoteData = {
  quote: string
}

export { UserData, BMKGData, QuoteData };
