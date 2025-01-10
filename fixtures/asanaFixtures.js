class AsanaFixtures {

    isTaskInList(taskName, taskList) {
        return taskList.some((task) => {
            if (task.toLowerCase() === taskName.toLowerCase()) {
                console.log(`list with tasks name contains ${task}`);
                return true; 
            }
            return false; 
        });
    }

     stringFromTaskToListWithParams(stringFromTask) {
       
        const regex = /([A-Z][a-z]+(?:\s[A-Z][a-z]+)*|\d{1,2}\/\d{1,2}\/\d{4})/g;
  
        const result = [];
        let match;
        
        while ((match = regex.exec(input)) !== null) {
          result.push(match[0]);  // Dodaj znaleziony fragment do wyniku
        }

       return result;
      }

      is
      
}

export default AsanaFixtures;
