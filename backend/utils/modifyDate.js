
// export const modifyDate = (data) => {

//    return data.map((content) => {

//       const doc = content._doc;

//       const date = new Date(doc.date);

//       const formattedDate = date.toISOString().split('T')[0];

//       return { ...doc, date: formattedDate };
//    });
// };

export const modifyDate = (data) => {
   
   return data.map((content) => {

      const date = new Date(content.date);

      const formattedDate = date.toISOString().split('T')[0];

      return { ...content, date: formattedDate };
   });
};