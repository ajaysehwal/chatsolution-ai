export class ManageCookies{
    
   protected expires:string;
   protected maxtime:number
   constructor(){
    this.expires=new Date(0).toUTCString();
    this.maxtime=100 * 365 * 24 * 60 * 60;
   }
  
   setcookie(name:string,value:string | undefined){
    const cookieOptions = `path=/; max-age=${this.maxtime}; SameSite=Lax; secure`;

    return (document.cookie = `${name}=${value}; ${cookieOptions}`)
   }
   deletecookie(name:string){
    const cookieOptions=`${name}=; path=/; expires=${this.expires}; SameSite=Lax; secure`;
    return (document.cookie=`${name}=/;${cookieOptions}`);
   }
   getcookie(name: string): string | undefined {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
          return cookieValue;
        }
      }
      return undefined;
    }
}