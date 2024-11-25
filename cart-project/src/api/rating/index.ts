import {
  type ProductProps,
  type UserProps,
  type CommentProps,
} from "../../utils/types";

export const fetchRatings = async (productId: string, userId: string) => {
  const response = await fetch(
    `http://localhost:8000/rating?productId=${productId}&userId=${userId}`
  );
  const data = await response.json();
  return data[0]?.rating;
};

export const handleStarRating = ({
  id,
  userId,
  starRef,
}: {
  id: string;
  userId: string;
  starRef: React.MutableRefObject<number>;
}) => {
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

export const fetchFavorite = async (userId: string) => {
  const response = await fetch(`http://localhost:8000/rating?userId=${userId}`);
  const data = await response.json();
  const productsIds = data
    .filter((item: { rating: number }) => item.rating > 0)
    .map((item: { productId: string }) => item.productId);
  return productsIds;
};

export const fetchProduct = async (id: string) => {
  const response = await fetch(`http://localhost:8000/products/${id}`);
  const data = await response.json();
  return data;
};

export const fetchProducts = async (
  searchQuery: string,
  setProducts: React.Dispatch<React.SetStateAction<ProductProps[]>>
) => {
  const response = await fetch("http://localhost:8000/products");
  const data = await response.json();
  const prods = data.filter((product: ProductProps) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setProducts(prods);
};

export const fetchNewestProducts = async ({
  setProducts,
  setValue,
  newestProducts,
  newestButtonClickedRef,
}: {
  setProducts: React.Dispatch<React.SetStateAction<ProductProps[]>>;
  setValue: React.Dispatch<React.SetStateAction<[number, number]>>;
  newestProducts: React.MutableRefObject<ProductProps[]>;
  newestButtonClickedRef: React.MutableRefObject<boolean>;
}) => {
  const response = await fetch(`http://localhost:8000/products`);
  const data = await response.json();
  newestProducts.current = data.slice(-3);
  newestButtonClickedRef.current = true;

  setValue([0, 0]);
  setProducts(newestProducts.current);
};

export const fetchProductPrice = async (
  value: [number, number],
  setProducts: React.Dispatch<React.SetStateAction<ProductProps[]>>
) => {
  const response = await fetch(`http://localhost:8000/products`);
  const data = await response.json();

  if (value[0] === 0 && value[1] === 0) {
    setProducts(data);
  } else {
    const prods = data.filter(
      (prod: ProductProps) => prod.price >= value[0] && prod.price <= value[1]
    );
    setProducts(prods);
  }
};

export const fetchPopularProducts = async ({
  popularProducts,
  popularButtonClickedRef,
  setValue,
  newestButtonClickedRef,
}: {
  popularProducts: React.MutableRefObject<ProductProps[]>;
  popularButtonClickedRef: React.MutableRefObject<boolean>;
  setValue: React.Dispatch<React.SetStateAction<[number, number]>>;
  newestButtonClickedRef: React.MutableRefObject<boolean>;
}) => {
  newestButtonClickedRef.current = false;
  const response = await fetch(`http://localhost:8000/products`);
  const data = await response.json();
  let averageRating = 0;

  data.forEach((product: ProductProps) => {
    if (product?.quantityOfSell !== undefined) {
      averageRating += product.quantityOfSell;
    }
  });
  averageRating = averageRating / data.length;

  const filteredPopularProducts = data.filter(
    (product: ProductProps) =>
      product?.quantityOfSell && product?.quantityOfSell > averageRating
  );
  popularButtonClickedRef.current = true;
  popularProducts.current = filteredPopularProducts;
  setValue([0, 0]);
};

export const fetchComments = async (
  setComments: React.Dispatch<React.SetStateAction<CommentProps[]>>
) => {
  const response = await fetch("http://localhost:8000/comments");
  const data = await response.json();
  setComments(data);
};

export const handleSendComment = async (
  commentText: string,
  userId: string,
  setCommentText: React.Dispatch<React.SetStateAction<string>>,
  setComments: React.Dispatch<React.SetStateAction<CommentProps[]>>
) => {
  const response = await fetch(`http://localhost:8000/comments`);
  const data = await response.json();

  const commentData = {
    id: (data.length + 1).toString(),
    comment: commentText,
    userId: userId,
    productId: "2",
  };

  const res = await fetch(`http://localhost:8000/comments`, {
    method: "POST",
    body: JSON.stringify(commentData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    setCommentText("");
    fetchComments(setComments);
  }
};

export const fetchUserAndLike = async (
  userId: string,
  commentId: string,
  setUserCommented: React.Dispatch<React.SetStateAction<UserProps | undefined>>,
  setCommentLiked: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // getting user and it's like of the post
  const response = await fetch(`http://localhost:8000/users/${userId}`);
  const data = await response.json();
  setUserCommented(data);
  const res = await fetch(
    `http://localhost:8000/commentLiked?userId=${userId}&commentId=${commentId}`
  );
  const info = await res.json();
  if (info.length) {
    const like = info[0].like === "true" ? true : false;
    setCommentLiked(like);
  }
};

export const handleLike = async ({
  userId,
  commentId,
  commentLiked,
  setCommentLiked,
}: {
  userId: string;
  commentId: string;
  commentLiked: boolean;
  setCommentLiked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    const checkLikeExist = await fetch(
      `http://localhost:8000/commentLiked?userId=${userId}&commentId=${commentId}`
    );
    const data = await checkLikeExist.json();
    const response = await fetch(`http://localhost:8000/commentLiked`);
    const allOfCommentLikedData = await response.json();

    const updatedData = {
      id: commentId.toString(),
      userId: userId,
      commentId: commentId,
      like: !commentLiked ? "true" : "false",
    };

    if (!data.length) {
      const response = await fetch(`http://localhost:8000/commentLiked`, {
        method: "POST",
        body: JSON.stringify({
          ...updatedData,
          id: (allOfCommentLikedData.length + 1).toString(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setCommentLiked(true);
      }
    } else {
      const response = await fetch(
        `http://localhost:8000/commentLiked/${data[0].id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setCommentLiked(!commentLiked);
      }
    }
  } catch (error) {
    console.error("Error during PUT request:", error);
  }
};
