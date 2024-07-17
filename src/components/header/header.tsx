// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";
// import HeaderProfile from "./headerProfile";

// const Header = () => {
//   const router = useRouter();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // 예시로 로컬 스토리지에 저장된 토큰을 확인하여 로그인 상태를 설정하는 코드입니다.
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);

//   return (
//     <div className="flex items-center justify-around py-[19px] md:justify-between md:px-[24px]">
//       <Link href="/">
//         <img
//           className="cursor-pointer"
//           src="/image/header_logo.svg"
//           alt="logo_small_icon"
//         />
//       </Link>
//       {router.pathname === "/" ? (
//         isLoggedIn ? (
//           <div className="flex gap-[25px] sm:gap-[12px]">
//             <img src="/image/notification_icon.svg" alt="notification_icon" />
//             <img src="/image/header_bar.svg" alt="header_bar_icon" />
//             <HeaderProfile />
//           </div>
//         ) : (
//           <div className="flex gap-[25px] text-[14px] font-medium text-[#1B1B1B]">
//             <Link href="/login">로그인</Link>
//             <Link href="/signup">회원가입</Link>
//           </div>
//         )
//       ) : (
//         <div className="flex gap-[25px] sm:gap-[12px]">
//           <img src="/image/notification_icon.svg" alt="notification_icon" />
//           <img src="/image/header_bar.svg" alt="header_bar_icon" />
//           <HeaderProfile />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Header;

import Link from "next/link";
import { useRouter } from "next/router";
import HeaderProfile from "./headerProfile";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  return (
    <div className="flex items-center justify-around py-[19px] md:justify-between md:px-[24px]">
      <Link href="/">
        <img
          className="cursor-pointer"
          src="/image/header_logo.svg"
          alt="logo_small_icon"
        />
      </Link>
      {router.pathname === "/" ? (
        isLoggedIn ? (
          <div className="flex gap-[25px] sm:gap-[12px]">
            <img src="/image/notification_icon.svg" alt="notification_icon" />
            <img src="/image/header_bar.svg" alt="header_bar_icon" />
            <HeaderProfile />
          </div>
        ) : (
          <div className="flex gap-[25px] text-[14px] font-medium text-[#1B1B1B]">
            <Link href="/signin">로그인</Link>
            <Link href="/signup">회원가입</Link>
          </div>
        )
      ) : (
        <div className="flex gap-[25px] sm:gap-[12px]">
          <img src="/image/notification_icon.svg" alt="notification_icon" />
          <img src="/image/header_bar.svg" alt="header_bar_icon" />
          <HeaderProfile />
        </div>
      )}
    </div>
  );
};

export default Header;
