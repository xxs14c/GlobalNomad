import React, { useRef } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import { ExperienceDeleteModalProps } from '@/types/myActivityPage';
import { useMutation } from '@tanstack/react-query';
import deleteMyActivity from '@/api/deleteMyActivity';
import Toast from '@/utils/Toast';
import queryClient from '@/lib/queryClient';
import ModalBackground from '../review/ModalBackground';

const ExperienceDeleteModal: React.FC<ExperienceDeleteModalProps> = ({
  isOpen,
  onClose,
  activityId,
  onDelete,
  refetchActivities,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, onClose);

  const { mutate } = useMutation<void, Error, string>({
    mutationFn: deleteMyActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['currentPageActivity'] });
      refetchActivities();
      onDelete();
      onClose();
    },
    onError: (error: unknown) => {
      Toast.error(error);
    },
  });

  const handleDeleteClick = () => {
    mutate(`${activityId}`);
  };

  if (!isOpen) return null;

  const handleClick = (event: React.MouseEvent) => event.stopPropagation();

  return (
    <ModalBackground onClose={onClose}>
      <div
        className="w-full h-full mob:w-[18.625rem] mob:h-[11.5rem] mob:rounded-xl bg-white p-6"
        ref={modalRef}
        onClick={handleClick}
      >
        <div className="w-full h-full flex flex-col items-center gap-8">
          <div className="w-full flex flex-col items-center gap-4">
            <img src="/image/footer_icon_check.svg" alt="checkBtn" />
            <p className="leading-[1.625rem]">삭제하시겠습니까?</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="w-20 h-[2.375rem] flex justify-center items-center gap-2 py-[0.625rem] border border-[#121] rounded-md text-[0.875rem]"
              onClick={onClose}
            >
              아니오
            </button>
            <button
              type="button"
              className="w-20 h-[2.375rem] flex justify-center items-center gap-2 py-[0.625rem] rounded-md bg-[#121] text-white text-[0.875rem]"
              onClick={handleDeleteClick}
            >
              예
            </button>
          </div>
        </div>
      </div>
    </ModalBackground>
  );
};

export default ExperienceDeleteModal;
