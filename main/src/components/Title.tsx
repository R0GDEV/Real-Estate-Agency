
interface TitleProps {
  text1: string;
  text2: string;
}

const Title: React.FC<TitleProps> = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-4">
    <p className="text-gray-700 text-xl font-bold">{text1}<span className="text-gray-900 font-semibold">{text2}</span></p>
    <p className="w-8 rounded-sm h-1 bg-gray-700"></p>
  </div>
  );
};
export default Title