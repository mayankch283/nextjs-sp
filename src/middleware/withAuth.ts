import { GetServerSideProps, GetServerSidePropsContext, NextApiRequest } from 'next';
import { getAuthCookie, verifyLocalToken } from '../lib/auth';

export function withAuth(getServerSideProps?: GetServerSideProps) {
  return async (context: GetServerSidePropsContext) => {
    const { req, res } = context;
    
    // Cast the request as NextApiRequest
    const token = getAuthCookie(req as NextApiRequest);
    
    if (!token) {
      // Redirect to login if no token is found
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    
    // Verify the token
    const userData = verifyLocalToken(token);
    
    if (!userData) {
      // Redirect to login if token is invalid
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    
    // Add the user data to the props
    const props = { user: userData };
    
    // Call the original getServerSideProps if it exists
    if (getServerSideProps) {
      const originalProps = await getServerSideProps(context);
      
      if ('props' in originalProps) {
        return { 
          props: { 
            ...props, 
            ...originalProps.props 
          } 
        };
      }
      
      return originalProps;
    }
    
    return { props };
  };
}