import BudgetForm from "../../app/form/BudgetForm"
import ContentSection from "./ContentSection"
import HomepageHeading from "./HomepageHeading"

export default function HomePage() {
    return (
        <>
        <HomepageHeading mobile={false} />
        <ContentSection />
        <BudgetForm />  
        </>
    )

}

