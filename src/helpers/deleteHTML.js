export const deleteHTML = (value) => value.replace(/<[^>]*>?/gm, '');
//ultility to help us delete html tag on a string