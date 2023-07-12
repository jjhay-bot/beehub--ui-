import { Box, Dialog, Grid, Stack } from "@mui/material";

const ModalBox = ({ showModal, setShowModal, center_content, title, content = "Content", footer }) => {
  return (
    <Dialog
      // fullWidth={'md'}
      sx={{ position: "absolute", right: 0 }}
      maxWidth={false}
      open={showModal}
      onClose={() => setShowModal()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <Stack p={4} sx={{ minHeight: "150px" }}>
        <Box>{title}</Box>
        <Grid container justifyContent={center_content && "center"}>
          {content}
        </Grid>
        <Box>{footer}</Box>
      </Stack>
    </Dialog>
  );
};

export default ModalBox;
