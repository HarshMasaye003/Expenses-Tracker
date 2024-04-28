export const addCategory = async (category) => {
  const newCategory = await setDoc(doc(db, "categories", uuidv4()), {
    category: category,
  });
  console.log(newCategory);

  setCategories((prevCategories) => [...prevCategories, category]);
};

export const handleCategories = useCallback(async () => {
  const querySnapshot = await getDocs(collection(db, "categories"));
  const categoriesData = [];
  querySnapshot.forEach((doc) => {
    categoriesData.push(doc.data().category);
  });
  setCategories(categoriesData);
}, []);

export const handleCategoryChange = (event) => {
  setCategoryOption(event.target.value);
  console.log(CategoryOption);
};
