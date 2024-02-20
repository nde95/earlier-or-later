import Modal from "./Modal";
import { useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import { SkeletonLeaderboard } from "../Skeleton";

interface ImageModalProps {
  onClose: () => void;
  isOpen?: boolean;
}

const LeaderboardModal: React.FC<ImageModalProps> = ({ isOpen, onClose }) => {
  const { getLeaderboard, setLeaderboard, leaderboard } = useUserContext();

  useEffect(() => {
    getLeaderboard();
    return () => {
      setLeaderboard(null);
    };
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="px-5 py-5 font-Nunito">
        <span className="font-bold mb-5">Top 5 Scores:</span>
        {leaderboard === null ? (
          <SkeletonLeaderboard />
        ) : (
          leaderboard.map((user: any, index: number) => (
            <div key={index}>
              <div className="bg-slate-200 rounded-md px-1">
                <p className="font-semibold">Rank {index + 1}:</p>
                <p className="mb-5">
                  {user.username}, {user.highScore} points
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
};

export default LeaderboardModal;
