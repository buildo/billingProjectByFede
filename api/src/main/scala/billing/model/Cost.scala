package billing.model
import java.util.UUID

case class Cost(title: String,
                value: Option[String],
                notes: Option[String],
                pricePerDay: Option[String],
                days: Option[String],
                allocationMonth: Option[String],
                allocationYear: Option[String],
                uuid: Option[UUID])
