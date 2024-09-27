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
      name: string;
      email: string;
      bio: string;
      education: string[];
      workExperience: string[];
      githubRepositories: string[];
  }

  declare interface getUsersProps {
    userId: string;
  }
  declare interface postCreationProps {
    userId: string;
    postData: string;
    postId: string;
  }
  declare interface PostCardProps {
      postId: string;
      content: string;
      likes: string[];
      dislikes: string[];
      comments: string[];
      userId: string;
  }

  declare interface CommentCardProps {
      commentId: string;
      content: string;
      userId: string;
      postId: string;
  }
declare interface likePostProps {
  postId: string;
  userId: string;
}

declare interface FooterProps {
  user: ProfileCardProps;
  type?: 'mobile' | 'desktop'
}