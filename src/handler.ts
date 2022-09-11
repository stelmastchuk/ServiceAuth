import { verify } from 'jsonwebtoken';
import { getSecretKey } from './awsSdkService/getSecretKey';
import { generateAuthResponse } from './generatePolice/generatePolice';

export const handler = async (event: any) => {
  console.log("EVENT::", event)

  const authHeader = event.authorizationToken 

  console.log("TOKEN::", authHeader)

    if (!authHeader) {
      return generateAuthResponse('user', 'Deny', event.methodArn) 
    }

    const [, token] = authHeader.split(' ');

  try {
    const { sub: issuerId } = verify(token, (await getSecretKey('SecretBank')).secretToken)
    return generateAuthResponse(issuerId, 'Allow', event.methodArn)
        
  } catch (error) {
      return generateAuthResponse('user', 'Deny', event.methodArn)
  }
       
}

