import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosinstance";
import { FaRegUser } from "react-icons/fa";
import { HiOutlinePencil } from "react-icons/hi2";
import { TbUserCheck } from "react-icons/tb";
import { MdPlaylistAddCheck } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { FaRegCalendarCheck } from "react-icons/fa6";
import Link from "next/link";
import List from "@/components/common/profile/List";
import Input from "@/components/mypage/Input";

interface UserData {
  nickname: string;
  email: string;
  newPassword?: string;
  //
  profileImageUrl?: string;
}

interface ResponseUserData {
  nickname: string;
  email: string;
  profileImageUrl?: string;
}

interface RequestUserData {
  nickname: string;
  newPassword: string;
  profileImageUrl?: string;
}

export default function mypage() {
  // 원본 데이터 (get 으로 불러온 데이터)
  const [originUser, setOriginUser] = useState<ResponseUserData>({
    nickname: "",
    email: "",
  });

  // 폼에 입력한 데이터 (전송할 때 사용할 데이터)
  // const [user, setUser] = useState<RequestUserData>({});

  // 원본 데이터 (get 으로 불러온 데이터)
  const [userData, setUserData] = useState<UserData>({
    nickname: "",
    email: "",
  });

  // 폼에 입력한 데이터 (전송할 때 사용할 데이터)
  // 하나의 객체 모양으로 state를 관리하거나
  // useReducer? 훅을 이용해 관련된 객체를 하나로 관리, 업데이트 가능함(추천)
  const [newNickname, setNewNickname] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  //
  const [src, setSrc] = useState<string | undefined>(undefined);
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>(
    undefined,
  );

  // get 요청, accessToken 분리
  // tanstack query(get 요청. 캐싱을 더 쉽게 처리가능. 응답속도 빨라짐)
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      axiosInstance
        .get("/users/me", {
          headers: {
            //생략가능
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setUserData({
            nickname: res.data.nickname,
            email: res.data.email,
            profileImageUrl: res.data.profileImageUrl,
          });
          setSrc(res.data.profileImageUrl);
        });
    }
  }, []);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleConfirmPasswordBlur = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordError("");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      //
      reader.onload = () => setSrc(reader.result as string);
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axiosInstance.post("/users/me/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const { profileImageUrl } = response.data;
        setProfileImageUrl(profileImageUrl);
      } catch (error) {
        console.error("Error uploading image", error);
      }
    }
  };

  const handleSave = () => {
    //
    const accessToken = localStorage.getItem("accessToken");

    // 필요성에 대해 생각. 더 알아보기
    if (accessToken) {
      const updateData: Partial<UserData> = {
        nickname: newNickname,
        newPassword,
        profileImageUrl,
      };

      axiosInstance
        .patch("/users/me", updateData, {
          headers: {
            // 삭제
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setUserData((prevData) => ({
            ...prevData,
            nickname: newNickname || prevData.nickname,
            newPassword: newPassword || prevData.newPassword,
            profileImageUrl: profileImageUrl || prevData.profileImageUrl,
          }));
          alert("정보가 성공적으로 변경되었습니다.");
        });
    }
  };

  return (
    <div className="flex min-h-screen justify-center gap-6 bg-gray_FA pt-[72px]">
      <div className="flex h-full w-[384px] flex-col gap-[24px] rounded-xl border p-[24px] shadow">
        <div className="flex justify-center">
          <div className="relative">
            {src ? (
              <img
                src={src}
                alt="유저이미지"
                className="h-[160px] w-[160px] rounded-full shadow"
              />
            ) : (
              <div className="flex h-[160px] w-[160px] items-center justify-center rounded-full bg-gray-200 shadow">
                <FaRegUser className="text-6xl text-gray-400" />
              </div>
            )}
            <label
              htmlFor="imageUpload"
              className="absolute bottom-0 right-2 flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-full bg-green_0B"
            >
              <HiOutlinePencil className="text-white" />
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-[8px]">
          <Link href="/mypage">
            <List icon={<TbUserCheck />} title="내 정보" />
          </Link>
          <Link href="/mybookinglist">
            <List icon={<MdPlaylistAddCheck />} title="예약내역" />
          </Link>
          <List icon={<CiSettings />} title="내 체험 관리" />
          <List icon={<FaRegCalendarCheck />} title="예약 현황" />
        </div>
      </div>

      <div className="flex w-[792px] flex-col gap-[24px]">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">내 정보</h1>
          <button
            className="h-[48px] w-[120px] rounded bg-nomad_black px-4 py-2 text-white"
            onClick={handleSave}
          >
            저장하기
          </button>
        </div>
        <div className="flex flex-col gap-[32px]">
          <Input
            label="닉네임"
            placeholder={userData.nickname}
            value={newNickname}
            onChange={handleNicknameChange}
          />
          <Input label="이메일" placeholder={userData.email} />
          <Input
            label="비밀번호"
            placeholder="8자 이상 입력해 주세요"
            type="password"
            value={newPassword}
            onChange={handlePasswordChange}
          />
          <Input
            label="비밀번호 재입력"
            passwordError={passwordError}
            placeholder="비밀번호를 한번 더 입력해 주세요"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onBlur={handleConfirmPasswordBlur}
            className={passwordError ? "border-red-500" : ""}
          />
        </div>
      </div>
    </div>
  );
}
