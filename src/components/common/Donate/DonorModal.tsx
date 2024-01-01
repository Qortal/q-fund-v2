import {
  Button,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ModalBody } from "../../Crowdfund/Crowdfund-styles";
import Box from "@mui/material/Box";
import { ViewableDonorData } from "./DonorInfo";
import { truncateNumber } from "../../../utils/numberFunctions.ts";

interface DonorModalProps {
  donorData: ViewableDonorData[];
  donorCount: number;
  closeModal: () => void;
  open: boolean;
}

const DonorModal = ({
  donorData,
  donorCount,
  closeModal,
  open,
}: DonorModalProps) => {
  const getAverageDonation = () => {
    if (donorCount === 0) return 0;
    let donorSum = 0;
    donorData.map(data => {
      donorSum += Number(data.amount);
    });
    const average = donorSum / donorCount;
    return truncateNumber(average, 2);
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClose={closeModal}
    >
      <ModalBody sx={{ width: "75vw", maxWidth: "75vw" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TableContainer sx={{ maxHeight: "80vw" }}>
            <Table align="center" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Amount (Total)</TableCell>
                  <TableCell>Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donorData.map((donorData, index) => (
                  <TableRow key={donorData.address + index.toString()}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{donorData.nameIfExists}</TableCell>
                    <TableCell>{donorData.amount}</TableCell>
                    <TableCell>{donorData.address}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Stack>
          <h4>Total # of Donations: {donorCount}</h4>
          <h4>Average Donation Amount: {getAverageDonation()}</h4>
        </Stack>
        <Button onClick={closeModal}>Close</Button>
      </ModalBody>
    </Modal>
  );
};
export default DonorModal;
