import React, {useState, useEffect} from 'react';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState('');

    const fetchRecipes = async () => {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`).then((respnse) => 
            respnse.json()
        );
        setRecipes(data.meals);
    };

    useEffect(() => {
        fetchRecipes();
    }, [query]);

    const handleModal = (id) => {
        const modal = document.getElementById(`${id}`);
        modal.classList.add('show');
    };

    const closeModal = (e) => {
        e.stopPropagation();
        if(e.target.classList.contains('modal')){
            e.target.classList.remove('show');
        }
    };

    return (
        <>
            <div className='search'>
                <input 
                    type = "text"
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    placeholder="Search for meal"
                />
            </div>
            <div className='grid'>
                {recipes === null ? (
                    <>
                        <h1>Sorry! No Recipes Were Found</h1>
                    </>
                ) : (
                    recipes?.map((recipe) => (
                        <div className='item' key={recipe.idMeal} onClick={() => handleModal(recipe.idMeal)}>
                            <div className='image'>
                                <img src={recipe.strMealThumb} alt={"Food pic"}/>
                            </div>
                            <div className='info'>
                                <h5>{recipe.strCategory}</h5>
                                <h3>{recipe.strMeal}</h3>
                                <span>{recipe.strTags}</span>
                            </div>
                            <div className='modal' id={recipe.idMeal} onClick={closeModal}>
                                <div className='content-modal'>
                                    <p>{recipe.strInstructions}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </>
    );
};

export default Recipes;