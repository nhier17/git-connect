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
  declare interface signInProps  {
    email: string;
    password: string;
  }

  declare interface SiderbarProps {
    name: string;
    email: string;
    userId: string;
  };

 declare interface ProfileCardProps  {
    user: {
      name: string;
      email: string;
      bio: string;
      education: string[];
      workExperience: string[];
      githubRepositories: string[];
    };
  }

  declare interface getUsersProps {
    userId: string;
  }