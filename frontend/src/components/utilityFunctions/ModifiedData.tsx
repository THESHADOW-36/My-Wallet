
export const ModifyDate = (data: any) => {
   
   return data.map((content: any) => {

      const date = new Date(content.date);

      const formattedDate = date.toISOString().split('T')[0];

      return { ...content, date: formattedDate };
   });
};