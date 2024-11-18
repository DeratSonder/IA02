 const response = await db.fetch(`get/reviews/${movieId}`);
        console.log(typeof response);
        console.log(response);
        console.log(response.items);
        