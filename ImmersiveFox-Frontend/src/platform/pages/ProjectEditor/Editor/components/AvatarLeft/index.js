import * as React from 'react';
import { avatarCard, avatarMainGrid } from "./style";
import { Card, CardMedia, Grid } from "@mui/material";
import AvatarPosition from "./AvatarPosition";
import { ManIcon } from "../../../../../../assets/icons";
import CustomButton from "../../../../../Controls/CustomButton";
import { colors } from "../../../../../../utils/colors";


const AvatarLeft = ({ selectedAvatar, setSelectedAvatar, avatars, avatarSelection, setAvatarSelection, setHelpModel }) => {
  return (
    <Grid sx={avatarMainGrid} item md={3}>
      <Grid item xs={12}>
        <h3>Avatars</h3>
      </Grid>
      <Grid className={'avatar-tabs'} item xs={12} container justifyContent={'space-between'}>
        <Grid item>
          <h4
            className={avatarSelection === 'system-avatar' ? 'selected' : ''}
            onClick={() => setAvatarSelection('system-avatar')}
          >Select Avatar</h4>
        </Grid>
        <Grid item>
          <h4
            className={avatarSelection === 'user-avatar' ? 'selected' : ''}
            onClick={() => setAvatarSelection('user-avatar')}
          >Personalized avatars</h4>
        </Grid>
      </Grid>
      <Grid
        style={{ overflowY: avatars.length > 12 ? 'auto' : 'hidden' }}
        className={'avatars'}
        container justifyItems='center' alignContent={'flex-start'} rowGap={1} spacing={1}>
        {avatars.length ? avatars.map((avatar, index) =>
          <Grid xs={4} item key={index.toString()} onClick={() => setSelectedAvatar(avatar)}>
            <Card sx={avatarCard} elevation={0} className={avatar.id === selectedAvatar.id ? 'selected' : 'avatar-card'}>
              <CardMedia component="img" image={avatar.thumbnail} alt={avatar.name} />
            </Card>
            <p className={avatar.id === selectedAvatar.id ? 'selected' : ''}>{avatar.name}</p>
          </Grid>) :
          <Grid
            style={{ height: '40vh' }}
            container alignContent={'center'}
            justifyContent={'center'} rowGap={2}>
            <Grid item xs={12}>
              <ManIcon />
            </Grid>
            <Grid item xs={12}>
              <p style={{ color: colors.white, fontSize: 20 }}>To add personalised avatar</p>
            </Grid>
            <Grid item xs={12} justifyContent={'center'}>
              <CustomButton style={{ fontWeight: 700, fontSize: 16, float: 'none' }} onClick={() => setHelpModel(true)}>
                Contact Us
              </CustomButton>
            </Grid>
          </Grid>
        }
      </Grid>
      {avatars.length ? <Grid className={'avatar-position'} container justifyItems='center' rowGap={1} spacing={1}>
        <AvatarPosition />
      </Grid> : null}
    </Grid>
  );
};

export default AvatarLeft;