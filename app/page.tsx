import RecipeView from "@/components/recipe-main";
import AppLayout from "@/components/app-layout";

export default function HomePage() {
  return (
    <AppLayout currentPage="home">
      <RecipeView recipeId="sample" />
    </AppLayout>
  );
}
