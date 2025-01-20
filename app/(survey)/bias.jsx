import { useSurveyContext } from "@/hooks/SurveyContext";
import { SURVEY_DATA } from "@/constants/Survey";
import SurveyGrid from "@/components/SurveyGrid";
import { useRouter } from "expo-router";
import axios from "axios";

export default function Bias() {
  const { setBias, setSplits, setSelection, formatParams } = useSurveyContext();
  const router = useRouter();

  const handleNext = async (selected, nextRoute) => {
    let bias = Array(SURVEY_DATA.bias.options.length).fill(.5);
    selected.forEach(i => bias[i - 1] = .75); 
   
    setBias(bias);
    const params = formatParams(bias);

    await axios.get('https://more-weight.com/splits', { params: params }).then((response) => {
      setSplits(response.data);
      setSelection(response.data.selection);
    });

    router.push(nextRoute);
  }

  return (
    <SurveyGrid
      title={SURVEY_DATA.bias.title}
      data={SURVEY_DATA.bias.options}
      numColumns={4}
      handleNext={handleNext}
      nextRoute={'base'}
      type={'many'}
    ></SurveyGrid>
  )
}