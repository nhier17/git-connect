declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };
  
  // ========================================
  
  declare type SignUpParams = {
    name: string;
    email: string;
    password: string;
  };
  declare interface signInProps {
    email: string;
    password: string;
  }

  declare interface SiderbarProps = {
    name: string;
    email: string;
    userId: string;
  };