import { useLocale } from "../components/providers/LanguageContext";

export default function useInformationBoardItems() {
  const { informationBoard } = useLocale();
  const informationBoardItems = [
    {
      key: 0,
      logo: "/images/Fitpass.png",
      titles: [
        informationBoard.AccessToEveryFacility,
        informationBoard.InCaesOfUsingFacility,
      ],
      hoverImage: "/images/Fitpass Image.png",
    },
    {
      key: 1,
      logo: "/images/Equipment Logo.jpg",
      titles: [
        informationBoard.ModernEquipment,
        informationBoard.ElectronicSystem,
      ],
      hoverImage: "/images/Equipment Image.jpeg",
    },
    {
      key: 2,
      logo: "/images/Healthy Logo.jpg",
      titles: [informationBoard.HealthySnacks, informationBoard.Kitchen],
      hoverImage: "/images/Cafe Image.jpg",
    },
    {
      key: 3,
      logo: "/images/Pro Logo.jpg",
      titles: [
        informationBoard.CertifiedTrainers,
        informationBoard.PilatesAndYoga,
      ],
      hoverImage: "/images/Trainer Image.jpg",
    },
    {
      key: 4,
      logo: "/images/Branches Logo.jpg",
      titles: [
        informationBoard.BranchesOnEachSide,
        informationBoard.SubscriptionSystemForEvery,
      ],
      hoverImage: "/images/Branches Image.png",
    },
  ];
  return { informationBoardItems };
}
