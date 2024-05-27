export const getCookie = (name: string, cookies: string): string => {
  return cookies.split('; ').find(cookie => cookie.includes(`${name}=`))?.split('=')[1] ?? ''
}
