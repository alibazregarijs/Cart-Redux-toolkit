export const fetchRatings = async (productId:string,userId:string) => {
    const response = await fetch(
      `http://localhost:8000/rating?productId=${productId}&userId=${userId}`
    );
    const data = await response.json();
    return data[0]?.rating;
};

export const handleStarRating = ({ id,userId , starRef }: { id: string,userId:string , starRef:React.MutableRefObject<number> }) => {
    const fetchRating = async () => {
      const response = await fetch(
        `http://localhost:8000/rating?productId=${id}&userId=${userId}`
      );
      const data = await response.json();
      const prod = data[0];

      if (prod) {
        const newRating = { ...prod, rating: starRef.current };
        await fetch(`http://localhost:8000/rating/${prod.id}`, {
          method: "PUT",
          body: JSON.stringify(newRating),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        const response = await fetch(`http://localhost:8000/rating`);
        const data = await response.json();
        const ratingId = (parseInt(data.length) + 1).toString();
        const newRating = {
          id: ratingId,
          userId,
          productId: id,
          rating: starRef.current,
        };
        await fetch(`http://localhost:8000/rating`, {
          method: "POST",
          body: JSON.stringify(newRating),
        });
      }
    };
    fetchRating();
  };