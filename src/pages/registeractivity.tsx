import Header from "@/components/header/header";
import Profile from "@/components/common/profile/Profile";
import Title from "@/components/registeractivity/Title";
import Input from "@/components/registeractivity/Input";
import Category from "@/components/registeractivity/Category";
import Explanation from "@/components/registeractivity/Explanation";
import Price from "@/components/registeractivity/Price";
import Address from "@/components/registeractivity/Address";
import Reserve from "@/components/registeractivity/Reserve";
import Banner from "@/components/registeractivity/Banner";
import Intro from "@/components/registeractivity/Intro";
import Footer from "@/components/footer/footer";

const registeractivity = () => {
  return (
    <>
      <div className="flex justify-center gap-[1.5rem] bg-gray_FA pt-[4.5rem]">
        <Profile />
        <div className="flex w-[49.5rem] flex-col">
          <Title />
          <Input />
          <Category />
          <Explanation />
          <Price />
          <Address />
          <Reserve />
          <Banner />
          <Intro />
        </div>
      </div>
    </>
  );
};

export default registeractivity;
