import { isEmpty } from "lodash";

export const getPreviewRedirectUrl = (postType:string|string[] ="", previewPostId:string|string[]="")=>{

  if(isEmpty(postType) || isEmpty(previewPostId))return''
  switch(postType){
    case 'post':
      return `/blog/preview/${previewPostId}`
    default: 
      return '/'
  }
}
export const getLoginPreviewRedirectUrl = ( postType = '', previewPostId = '' ) => {
	return `/login/?postType=${postType || ''}&previewPostId=${previewPostId || ''}`;
};
