export const formatDate=(dateString)=> {
      // Create a Date object from the input string
      const date = new Date(dateString);
  
      // Extract the date components
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
      const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
      const hours = String(date.getHours()).padStart(2, '0'); // Add leading zero if needed
      const minutes = String(date.getMinutes()).padStart(2, '0'); // Add leading zero if needed
      const seconds = String(date.getSeconds()).padStart(2, '0'); // Add leading zero if needed
  
      // Construct the formatted date string
      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
      return formattedDate;
  }
  

  