import bot from "../../ozone_bot/initialize";

export default function Login(req: any, res: any) {
  const bo2=bot;
  return res.status(200).json({note:"Success!"})
}