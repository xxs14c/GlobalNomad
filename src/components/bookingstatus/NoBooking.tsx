const NoBooking = () => (
    <div className="flex flex-col gap-5 mx-auto my-auto w-[240px]">
      <div className="px-[54px] py-[31px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="131"
          height="178"
          viewBox="0 0 131 178"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 130.168V44.9736L44.9736 0H106.397C119.652 0 130.397 10.7452 130.397 24V112.29V130.168V153.259C130.397 166.514 119.652 177.259 106.397 177.259H24C10.7452 177.259 5.65451e-06 166.514 5.65451e-06 153.259V130.184C1.88504e-06 130.179 0 130.173 0 130.168Z"
            fill="#DDDDDD"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.78172 46.8613C1.10067 46.8613 -0.234016 43.6127 1.67266 41.7278L41.7523 2.10714C43.6471 0.234005 46.8613 1.57625 46.8613 4.24064V22.8613C46.8613 36.1161 36.1162 46.8613 22.8613 46.8613H3.78172Z"
            fill="#79747E"
          />
        </svg>
      </div>
      <div className="text-center text-gray-70 text-base">
        아직 등록한 체험이 없어요
      </div>
    </div>
  );
  
  export default NoBooking;
  